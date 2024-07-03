import express  from "express";
import { convertVideo, deleteProcessedVideo,deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcessedVideo } from "./storage";
import { isVideoNew, setVideo } from "./firestore";

setupDirectories();

const app = express();
app.use(express.json());    

app.post("/process-video", async (req, res)=>{
    // get the bucket name from the cloud pub/sub message   
    let data;
    try{
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8'); 
        data = JSON.parse(message);
        if(!data.name){
            throw new Error("Invalid message payload is recieved"); 
        }   
    }catch(error){
        console.error(error);
        return res.status(400).send("Bad request: missing filename");    
    }

    const inputFileName = data.name;    
    const outputFilePath = `processed-${inputFileName}`;   // it is outputfilename not path
    const videoId = inputFileName.split('.')[0];
    
    if(!isVideoNew(videoId)){
        return res.status(400).send("Bad request: Video has already been processed");
    }else{
        await setVideo(
            videoId,
            {
                id: videoId,
                uid: videoId.split('-')[0], 
                status: 'processing',
            }
        )
    }


    // download the raw video from tha cloud
    await downloadRawVideo(inputFileName);
    // first process then upload
    try{
        await convertVideo(inputFileName, outputFilePath);
    }catch(error){
        await Promise.all([
            deleteRawVideo(inputFileName),
            deleteProcessedVideo(outputFilePath)
        ]);
        console.log(error);
        return res.status(500).send("Internal server error: Video processing failed");   
    }
    // upload the processed video to the cloud  
    await uploadProcessedVideo(outputFilePath);

    // update the firestore document
    await setVideo(
        videoId,
        {
            status: 'processed',
            filename: outputFilePath,
        }
    );

    await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFilePath)
    ]);

    return res.status(200).send("Processing finished successfully  ");
});


const port = process.env.PORT || 8080;  
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);  
});