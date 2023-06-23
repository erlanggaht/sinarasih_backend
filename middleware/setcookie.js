import cookieSession from "cookie-session"

function setCookie(req,res,next){
    
    res.setHeader("Access-Control-Allow-Origin", 'https://sinarasih.vercel.app/');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  
    next();
    
    res.cookie('erlangga','dsjdhjshd')
    
}

export default setCookie