import '../styles/RequestItem.css';

const RequestItem = ({ request, onDeny, onAccept }) => {

    const pendingStatus = 'PENDING';

    return (
        <div className="request-item">
          <div className="request-header">
            <h3>Request to adopt {request.petName}</h3>
            
          </div>
          <div className="request-body">
          <h4>From: </h4>
            <p>name: {request.userReqId.fullName} <br></br>
            phone: {request.userReqId.phone} <br></br>
            email: {request.userReqId.email} <br></br>
            The message attach:  {request.message} </p>
            </div>
          <div className="request-actions">
            { request.status !== pendingStatus ? 
              (
                <button>{request.status}</button>
              ) 
              : 
              (
              <>
                <button onClick={onAccept}>Accept</button>
                <button onClick={onDeny}>Deny</button>
              </>
              
              )
            }
            
          </div>
          <p>{new Date(request.created_at).toLocaleString()}</p>
        </div>
      );
};

export default RequestItem;