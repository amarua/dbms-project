const Borrower = ({borrower,editID,Changeid}) => {
    const show=() =>{

        if(editID===borrower.id){
            return(
                <tr>
                <td><input type="text" value={borrower.name}></input></td>
                <td>#{borrower.id}</td>
                <td><input type="text" value={borrower.add}></input></td>
                <td><input type="text" value={borrower.phn}></input></td>
                <td>
                <i className="fa fa-floppy-o" aria-hidden="true" onClick={()=> Changeid('')}></i></td>
            </tr>
            )
        }else{
            return(
                <tr>
                <td>{borrower.name}</td>
                <td>#{borrower.id}</td>
                <td>{borrower.add}</td>
                <td>{borrower.phn}</td>
                <td>
                <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={()=> Changeid(borrower.id)}></i></td>
            </tr>
            )
            
        }
            
    }
    // const show=() =>{
    //     <tr>
    //         <td>{borrower.name}</td>
    //         <td>#{borrower.id}</td>
    //         <td>{borrower.add}</td>
    //         <td>{borrower.phn}</td>
    //         <td>
    //         <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={()=> ChangeMode()}></i></td>
    //     </tr>
    // }
    return show();
}
 
export default Borrower;