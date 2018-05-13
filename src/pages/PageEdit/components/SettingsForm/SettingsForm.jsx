/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Upload, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SettingsForm.scss';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const { ImageUpload } = Upload;

function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onChange(info) {
  console.log('onChane callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}

export default class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        gender: 'male',
        notice: false,
        email: '',
        avatar: '',
        siteUrl: '',
        githubUrl: '',
        twitterUrl: '',
        description: '',
      },
    };
  }

  onDragOver = () => {
    console.log('dragover callback');
  };

  onDrop = (fileList) => {
    console.log('drop callback : ', fileList);
  };

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <Row style={styles.formItem}>
                <Col xxs="6" s="5" l="3" style={styles.label}>
                  名称：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required max={10} message="必填">
                    <Input size="large" placeholder="解忧帮" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="5" l="3" style={styles.label}>
                  Logo：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="avatar" required message="必填">
                    <ImageUpload
                      listType="picture-card"
                      action=""
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      locale={{
                        image: {
                          cancel: '取消上传',
                          addPhoto: '上传图片',
                        },
                      }}
                      beforeUpload={beforeUpload}
                      onChange={onChange}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  </IceFormBinder>
                  <IceFormError name="avatar" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="5" l="3" style={styles.label}>
                  描述：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="recommendDesc"
                    required
                    message="请输入正确的描述"
                  >
                    <Input
                      size="large"
                      placeholder="零门槛，极速借"
                    />
                  </IceFormBinder>
                  <IceFormError name="recommendDesc" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="5" l="3" style={styles.label}>
                  网站地址：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    type="url"
                    name="siteUrl"
                    required
                    message="请输入正确的网站地址"
                  >
                    <Input
                      size="large"
                      type="url"
                      placeholder="https://alibaba.github.io/ice"
                    />
                  </IceFormBinder>
                  <IceFormError
                    name="siteUrl"
                    required
                    message="请输入正确的网站地址"
                  />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="5" l="3" style={styles.label}>
                  申请人数：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="joincount"
                    required
                    message="请输入正确的申请人数"
                  >
                    <Input
                      size="large"
                      placeholder="123456"
                    />
                  </IceFormBinder>
                  <IceFormError name="joincount" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="5" l="3" style={styles.label}>
                  统计code：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="code"
                    required
                    message="请输入正确的 统计code"
                  >
                    <Input size="large" placeholder="jieyoubang" />
                  </IceFormBinder>
                  <IceFormError name="code" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
    width:30
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
