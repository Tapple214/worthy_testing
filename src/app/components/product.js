// changes your background to white due to default settings
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Product({id, title, content, userName}) {
    return (
        <div className="border border-white rounded p-5">
            <h1>{title}</h1> 
            <p>{userName}</p>
            <p>{content}</p>    
        </div>
    )
}