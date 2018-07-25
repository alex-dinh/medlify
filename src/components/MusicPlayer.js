import React, {Component} from 'react';

class Book extends Component{
    render(){
        return(
            <h1 style={{
                position: "fixed",
                top: "50%",
                bottom: "50%",
                marginTop: "-50px",
                marginLeft: "-100px"}}>
                {this.props.match.params.id}
            </h1>
        );
    }
}

// export default ({match: {params: {id}}}) =>
//     <h1 style={{position: "fixed", top: "50%", bottom: "50%", marginTop: "-50px", marginLeft: "-100px"}}>{id}</h1>;
export default Book;