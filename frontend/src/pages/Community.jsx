import { useEffect, useState } from 'react'
import {useAuth, useUser} from '@clerk/clerk-react'
import { Heart, Download } from 'lucide-react'; // ⬅️ added Download icon
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {

  const [creations,setCreations] = useState([]);
  const {user} = useUser();
  const [loading , setLoading] = useState(true);

  const {getToken} = useAuth();

  const fetchCreations = async()=>{
     try {
      const {data} = await axios.get('/api/user/get-published-creations',{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      })
      
      if(data.success){
        setCreations(data.creations);
      }
      else{
        toast.error(data.message);
      }
     } catch (error) {
      toast.error(error.message);
     }

     setLoading(false);
  }

  const imageLikeToggle = async(id)=>{
    try {
       const {data} = await axios.post('/api/user/toggle-like-creation',{id},{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      });

      if(data.success){
        toast.success(data.message);
        await fetchCreations();
      }
      else{
         toast.error(data.message);
      }
    } catch (error) {
       toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(user){
      fetchCreations();
    }
  },[user])

  const handleDownload = async (url, filename = "creation.png") => {
    try {
      const res = await fetch(url, { mode: "cors" });
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link); 
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
      toast.error("Download failed");
    }
  };

  return !loading ? (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      Image Creations of different Users
      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
        {
        creations.map((c, index)=>(
          <div key={index} className='relative group inline-block pl-3 pt-3 w-full
          sm:max-w-1/2 lg:max-w-1/3'>
            <img src={c.content} alt="" className='w-full h-full object-cover rounded-lg'/>

            <div className='absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end
            justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b
            from-transparent to-black/80 text-white rounded-lg'>
              <p className='text-sm hidden group-hover:block'>{c.prompt}</p>
              <div className='flex gap-3 items-center'>
                
                <div className='flex gap-1 items-center'>
                  <p>{c.likes.length}</p>
                  <Heart 
                    onClick={()=>imageLikeToggle(c.id)} 
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer
                   ${c.likes.includes(user.id)? 'fill-red-500 text-red-600' : 'text-white'}`}
                  />
                </div>
               
                <Download
                  onClick={() => handleDownload(c.content, "creation.png")}
                  className="min-w-5 h-5 hover:scale-110 cursor-pointer text-white"
                />
              </div>
            </div>
           </div>
        ))
        }
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <span className='w-10 h-10 my-1 rounded-full border-3 border-primary
      border-t-transparent animate-spin'></span>
    </div>
  )
}

export default Community
