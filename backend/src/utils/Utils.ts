import { Readable } from "stream";


const streamToBuffer = async(stream :Readable): Promise<Buffer>=>{
    return new Promise((resolve,reject)=>{
        const chunks: Buffer[]=[];
        stream.on("data",(chunk)=>chunks.push(chunk));
        stream.on("data",reject);
        stream.on("data",()=>resolve(Buffer.concat(chunks)));
    });
}

export default {
    streamToBuffer
}