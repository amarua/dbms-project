import Book from './Book';
const Books =()=>{
    return (
        <div className="books">
          <div className="row">
          
              <form action="#">
              <button type="button" className="btn btn-outline-info add-book-btn">
                Add Book
              </button>
                  <p>
                  <label>
                      <input type="checkbox" />
                      <span>All</span>
                  </label>
                  </p>
                  <p>
                  <label>
                      <input type="checkbox" />
                      <span>sci</span>
                  </label>
                  </p>
                  <p>
                  <label>
                      <input type="checkbox" />
                      <span>arts</span>
                  </label>
                  </p>
                  <p>
                  <label>
                      <input type="checkbox" />
                      <span>com</span>
                  </label>
                  </p>
                  <input type="text" placeholder="Search"></input>
              </form>

              
          </div>
          <div className="table-wrapper"> 
            <table>
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Avaliable Stock</th>
                    <th>Item Price</th>
                    <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
              </tbody>
            </table>
          </div>
            
        </div>
    )
}
export default Books;