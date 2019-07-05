import React from 'react';
import { Card, Button, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import PropTypes from 'prop-types';

const RetreatBookSection = ({item, handleSubmitBookNow, handleFormNameChange, handleFormEmailChange, handleFormDescriptionChange}) => (
 <div>
    <Card title="Book Now">
      <Form onSubmit={handleSubmitBookNow} className="book-form">
        <Form.Item label="Your Name">
            <Input required type="text" placeholder="Name" onChange={handleFormNameChange}/>
        </Form.Item>
        <Form.Item label="Your Email">
            <Input required type="email" placeholder="Email" onChange={handleFormEmailChange}/>
        </Form.Item>
        <Form.Item label="Booking Details">
          <TextArea required placeholder="Enter booking details" onChange={handleFormDescriptionChange} autosize={{ minRows: 6, maxRows: 10 }} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Book Now</Button>
        </Form.Item>        
      </Form>
    </Card>
</div>
);

RetreatBookSection.propTypes = {
  handleSubmitBookNow: PropTypes.func.isRequired,
  handleFormEmailChange: PropTypes.func.isRequired,
  handleFormNameChange: PropTypes.func.isRequired,
  handleFormDescriptionChange: PropTypes.func.isRequired
}

export default RetreatBookSection;