import psql from "../configs/db.js";

export const getUserCreations = async(req,res)=>{
    try {
        
        const {userId} = req.auth();

       const creations = await psql` SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

       res.json({
        success:true,
        creations
       });

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

export const getPublishedCreations = async(req,res)=>{
    try {

       const creations = await psql` SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

       res.json({
        success:true,
        creations
       });

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

export const toggleLikeCreations = async(req,res)=>{
    try {

        const {userId} = req.auth();
        const {id} = req.body;

        const [creation] = await psql`SELECT * FROM creations WHERE id = ${id}`;

        if(!creation){
            return res.json({
                success:false,
                message:"Creation not found"
            });
        }

        const currentLikes = creation.likes;
        const userIdString  = userId.toString();
        let updatedLikes;
        let message;

        if(currentLikes.includes(userIdString)){
            updatedLikes = currentLikes.filter((user)=>user !== userIdString);
            message='Creation Unliked';
        }
        else{
            updatedLikes = [...currentLikes, userIdString];
            message = 'Creation Liked';
        }

        const formattedArray = `{${updatedLikes.join(',')}}`;

        await psql`UPDATE creations SET likes  = ${formattedArray}::text[] WHERE id=${id}`;

       res.json({
        success:true,
        message
       });

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}