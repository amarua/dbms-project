const Alert =({type,msg})=>{
    const style="alert alert-"+type;
    return (
        <div className={style} role="alert">
                {msg}
         </div>
    )
}
export default Alert;