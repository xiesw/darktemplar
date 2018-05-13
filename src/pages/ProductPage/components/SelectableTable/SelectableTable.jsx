import React, {Component} from 'react';
import {Table, Button, Icon, Pagination, Dialog, Notice, Feedback, Form, Upload} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Api from "../../../../net/Api";
import Http from "../../../../net/Http";
import PageEdit from "../../../PageEdit/PageEdit";
import SettingsForm from "../../../PageEdit/components/SettingsForm/SettingsForm";
import Utils from "../../../../util/Utils";

// 注意：下载数据的功能，强烈推荐通过接口实现数据输出，并下载
// 因为这样可以有下载鉴权和日志记录，包括当前能不能下载，以及谁下载了什么

export default class SelectableTable extends Component {
  static displayName = 'SelectableTable';

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
      dataSource: [],
      dialogVisible: false,
      dialogType: "",
      editData: {},
      noticeText: '',
      isSaved: true
    };
  }

  componentDidMount() {
    Api.getLoanList()
      .then(result => {
        this.serviceData = result.slice();
        this.setState({
          dataSource: result
        })
      })
      .catch(error => {
        console.log('pain.xie', error);
      })
  }

  // 添加数据
  add() {
    this.setState({
      dialogType: 'add',
      dialogVisible: true,
      editData: {},
    });
  }

  // 编辑数据
  editItem(item) {
    this.setState({
      editData: item,
      dialogType: 'edit',
      dialogVisible: true
    });
  };

  // 删除数据
  deleteItem = (item) => {
    Dialog.confirm({
      content: "确定删除吗",
      title: "删除数据",
      onOk: () => {
        let dataSource = this.state.dataSource;
        Utils.removeArrayItem(dataSource, item);
        this.setState({
          dataSource
        });
        Feedback.toast.success("删除数据成功");
      }
    });
    this.checkSave();
  };

  // item 向上
  up = (item) => {
    let dataSource = this.state.dataSource;
    Utils.upRecord(dataSource, item);
    this.setState({
      dataSource
    });
    this.checkSave();
  };

  // item 向下
  down = (item) => {
    let dataSource = this.state.dataSource;
    Utils.downRecord(dataSource, item);
    this.setState({
      dataSource
    });
    this.checkSave();
  };

  // 关闭dialog回调
  onCancel() {
    this.setState({
      dialogVisible: false
    });
  };

  // 编辑完成回调
  onEditSuccess(type, oldData, newData) {
    if (type === 'add') {
      this.state.dataSource.push(newData);
      Feedback.toast.success("添加数据成功");
    } else {
      Utils.exchangeItem(this.state.dataSource, oldData, newData);
      Feedback.toast.success("修改数据成功");
    }

    this.checkSave();
    this.setState({
      dialogVisible: false
    });
  }

  // 保存数据到服务器
  save() {
    Api.uploadLoanList(this.state.dataSource)
      .then(result => {
        Feedback.toast.success("保存成功");
        this.serviceData = this.state.dataSource.slice();
      })
      .catch(error => {
          console.log('pain.xie', error);
          Feedback.toast.error('保存失败');
        }
      );
  }

  // 检查是否保存了数据
  checkSave() {
    this.setState({
      isSaved: Utils.compareArray(this.state.dataSource, this.serviceData)
    });
  }

  onChange() {

  }

  imageRender = function (imagepath, index, record) {
    // todo
      if(imagepath) {
        return (<img
          style={styles.image}
          src={Http.getImagePath(imagepath)}
          onClick={() => {console.log('pain.xie', index)}}
        />)
      } else {
        return(<Upload
          listType="text"
          action="//next-upload.shuttle.alibaba.net/upload" // 该接口仅作测试使用，业务请勿使用
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
          data={{ token: "abcd" }}
          onChange={() => this.onChange()}
          defaultFileList={[
            {
              name: "IMG.png",
              status: "done",
              size: 1024,
              downloadURL:
                "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
              fileURL:
                "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
              imgURL:
                "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
            }
          ]}
        >
          <Button type="primary" style={{ margin: "0 0 10px" }}>
            上传文件
          </Button>
        </Upload>)
      }
  };

  renderOperator = (value, index, record) => {
    return (
      <div>
        <div>
          <a onClick={() => this.editItem(record)}>编辑</a>
          <a
            style={styles.removeBtn}
            onClick={this.deleteItem.bind(this, record)}
          >
            删除
          </a>
        </div>
        <div style={{marginTop: 10}}>
          <a onClick={this.up.bind(this, record)}>向上</a>
          <a
            style={styles.removeBtn}
            onClick={this.down.bind(this, record)}
          >
            向下
          </a>
        </div>

      </div>
    );
  };

  render() {

    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.IceContainer}>
          <div>
            <Button size="large" style={styles.batchBtn} onClick={() => this.add()}>
              <Icon type="add"/>增加
            </Button>
            <Button
              onClick={() => this.save()}
              size="large"
              style={styles.batchBtn}
              type={this.state.isSaved ? 'normal' : 'primary'}
            >
              <Icon type="store"/>保存
            </Button>
          </div>
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={this.state.dataSource}
            isLoading={this.state.isLoading}
          >
            <Table.Column title="图片" cell={this.imageRender} dataIndex="imagepath" width={75}/>
            <Table.Column title="名称" dataIndex="name" width={80}/>
            <Table.Column title="描述" dataIndex="recommendDesc" width={120}/>
            <Table.Column title="链接" dataIndex="applyUrl" width={160}/>
            <Table.Column title="申请人数" dataIndex="joincount" width={80}/>
            <Table.Column title="统计code" dataIndex="code" width={100}/>
            <Table.Column
              title="操作"
              cell={this.renderOperator}
              lock="right"
              width={120}
            />
          </Table>
        </IceContainer>

        <Dialog
          style={styles.dialog}
          visible={this.state.dialogVisible}
          closable="esc,mask,close"
          footer={<a/>}
          onClose={() => this.onCancel()}
          title={this.state.dialogType === 'add' ? '添加' : '编辑'}
        >
          <SettingsForm
            type={this.state.dialogType}
            data={this.state.editData}
            onEditSuccess={(type, oldData, newData) => this.onEditSuccess(type,  oldData, newData)}
          />
        </Dialog>

      </div>
    );
  }
}

const styles = {
  batchBtn: {
    marginRight: '10px',
  },
  IceContainer: {
    marginBottom: '20px',
    minHeight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  removeBtn: {
    marginLeft: 10,
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
  dialog: {
    width: 500,
  },
  image: {
    width: 50,
    height: 50,
    display: 'flex',
    ali: 'center',
    justifySelf: 'center',
  }
};
