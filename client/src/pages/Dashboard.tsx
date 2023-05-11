import Navigation from "../components/Navigation/Navigation";
import Contacts from "../components/Contacts/Contacts";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chatbox from "../components/Chatbox/Chatbox";
import {data} from '../data/user.json'

const Dashboard: React.FC = () => {
  return (
    <div>
    <Row>
      <Col lg={1}>
        <Navigation  />
      </Col>
      <Col lg={3} className="shadow">
        <Contacts users={data}/>
      </Col>
      <Col lg={8}>
        <Chatbox users={data}/>
      </Col>
    </Row>

    </div>
  );
};

export default Dashboard;