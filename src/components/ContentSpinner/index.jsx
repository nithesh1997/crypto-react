import Spinner from 'react-bootstrap/Spinner';


function ContentSpinner() {
  return (
   <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
    <Spinner animation="border" variant="secondary" />
   </div>
  );
}

export default ContentSpinner;