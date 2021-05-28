const Books =()=>{
    return (
        <div className="books">
        <div className="row">
            <form action="#">
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
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
        </tbody>
      </table>
        </div>
            
        </div>
    )
}
export default Books;