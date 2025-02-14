import { assets } from "../assets/assets";
export default function Footer(){
    return(
        <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20">
            <img width={160} src={assets.logo}/>
            <p className="flex-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright @soumikdalei | All right reserved.</p>
            <div className="flex gap-2.5 items-center">
                <img width={38} src={assets.facebook_icon}/>
                <img width={38} src={assets.twitter_icon}/>
                <img width={38} src={assets.instagram_icon}/>
            </div>
        </div>
    )
}