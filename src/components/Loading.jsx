
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <div>
         <Button variant="primary" disabled className='position-absolute top-50 start-50'>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>
    </div>
  )
}

export default Loading