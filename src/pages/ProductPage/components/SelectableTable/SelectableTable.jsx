import React, { Component } from 'react';
import { Table, Button, Icon, Pagination, Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Api from "../../../../net/Api";
import Http from "../../../../net/Http";
import PageEdit from "../../../PageEdit/PageEdit";
import SettingsForm from "../../../PageEdit/components/SettingsForm/SettingsForm";

const getMockData = () => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push({
      id: 100306660940 + i,
      title: {
        name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`,
      },
      type: 'demo示例',
      template: '参数字典列表',
      status: '已发布',
      publisher: '小马',
      rate: '5',
      time: 2000 + i,
    });
  }
  return result;
};

// 注意：下载数据的功能，强烈推荐通过接口实现数据输出，并下载
// 因为这样可以有下载鉴权和日志记录，包括当前能不能下载，以及谁下载了什么

export default class SelectableTable extends Component {
  static displayName = 'SelectableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 表格可以勾选配置项
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids) => {
        console.log('ids', ids);
        this.setState({
          selectedRowKeys: ids,
        });
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
        console.log('onSelectAll', selected, records);
      },
      // 支持针对特殊行进行定制
      getProps: (record) => {
        return {
          disabled: record.id === 100306660941,
        };
      },
    };

    this.state = {
      selectedRowKeys: [],
      dataSource: [],
      dialogVisible:false
    };
  }

  componentDidMount() {
    Api.getLoanList()
      .then(result => {
        this.setState({
          dataSource:result
        })
      })
      .catch(error => {
        console.log('pain.xie', error);
      })
  }

  add() {
    this.setState({
      dialogVisible: true
    });
  }

  editItem(record){
    this.setState({
      dialogVisible: true
    });
  };

  deleteItem = (record) => {
    const { id } = record;
    console.log('delete item', id);
  };

  up = (record) => {

  };

  down = (record) => {

  };

  onOk = () => {

  };

  onCancel(){
    this.setState({
      dialogVisible: false
    });
  };

  save() {

  }

  imageRender = function(imagepath) {
    return (
      <div className="media">
        <img
          style={styles.image}
          src={Http.getImagePath(imagepath)}
        />
      </div>
    );
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
            <Button size="small" style={styles.batchBtn} onClick={() => this.add()}>
              <Icon type="add" />增加
            </Button>
            {/*<Button*/}
              {/*onClick={this.deleteSelectedKeys}*/}
              {/*size="small"*/}
              {/*style={styles.batchBtn}*/}
              {/*disabled={!this.state.selectedRowKeys.length}*/}
            {/*>*/}
              {/*<Icon type="ashbin" />删除*/}
            {/*</Button>*/}
            <Button
              onClick={this.save}
              size="small"
              style={styles.batchBtn}
            >
              <Icon type="store" />保存
            </Button>
          </div>
          {/*<div>*/}
            {/*<a href="/" download>*/}
              {/*<Icon size="small" type="download" /> 导出表格数据到 .csv 文件*/}
            {/*</a>*/}
          {/*</div>*/}
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={this.state.dataSource}
            isLoading={this.state.isLoading}
          >
            <Table.Column title="图片" cell={this.imageRender} dataIndex="imagepath" width={75} />
            <Table.Column title="名称" dataIndex="name" width={80} />
            <Table.Column title="描述" dataIndex="recommendDesc" width={120} />
            <Table.Column title="链接" dataIndex="applyUrl" width={160} />
            <Table.Column title="申请人数" dataIndex="joincount" width={80} />
            <Table.Column title="统计code" dataIndex="code" width={100} />
            <Table.Column
              title="操作"
              cell={this.renderOperator}
              lock="right"
              width={120}
            />
          </Table>
          {/*<div style={styles.pagination}>*/}
            {/*<Pagination onChange={this.change} />*/}
          {/*</div>*/}
        </IceContainer>

        <Dialog
          style={styles.dialog}
          visible={this.state.dialogVisible}
          closable="esc,mask,close"
          footer={<a/>}
          onClose={() => this.onCancel()}
          title="编辑"
        >
          <SettingsForm/>
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
    width:500,
  },
  image: {
    width: 50,
    height: 50,
    display: 'flex',
    ali: 'center',
    justifySelf: 'center',
  }
};
