import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ form }) => ({
  data: form.certificate,
}))
class Step3 extends React.PureComponent {
  render() {
    const { data } = this.props;
    console.log(data,"in step 3");
    const onFinish = () => {
      router.push('/certificates');
    };
    const information = (
      <div className={styles.information}>
        {/* <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Achievement Title：
          </Col>
          <Col xs={24} sm={16}>
            {data.achievement_title}
          </Col>
        </Row> */}
        {/* <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Domain：
          </Col>
          <Col xs={24} sm={16}>
            {data.domain}
          </Col>
        </Row> */}
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Event：
          </Col>
          <Col xs={24} sm={16}>
            {data.event_name}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Issue Date：
          </Col>
          <Col xs={24} sm={16}>
            {data.issue_date}
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          Finish
        </Button>
        {/* <Button>查看账单</Button> */}
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="Success"
        description="Your certificate has been sent"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step3;
