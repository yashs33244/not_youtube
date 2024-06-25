import express  from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());    

app.post("/process-video", (req, res)=>{
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if(!inputFilePath || !outputFilePath){
        res.status(400).send("Missing input or output file path");
    }
    ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-2:360") // 360p
        .on("end", ()=>{        
            res.status(200).send("Video processing completed");
        })   
        .on("error", (err)=>{
            console.error(err);
            res.status(500).send("Video processing failed internal server error");
        })
        .save(outputFilePath);    

});


const port = process.env.PORT || 3000;  
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);  
});