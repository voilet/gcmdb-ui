import React, {PureComponent} from 'react';
import styles from './ipresouce.less'
import {connect} from 'dva';
import {
    Card,
    Form,
    Input,
    Icon,
    Button,
    Modal,
    message,
    Select
  } from 'antd';

const Option = Select.Option
const FormItem = Form.Item;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const { TextArea } = Input;
@connect((props) => (props))

@Form.create()

export default class addipResource extends PureComponent {
  
  state = {
    modalVisible: false,
    result: "",
    data: [],
    loading: this.props.checkloading,
    enable: false
  };


  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }



  //ip转数字
  ip2int = (ip) => {
      let num = 0;
      ip = ip.split(".");
      num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
      num = num >>> 0;
      return num;
  }

  //数字转IP
  int2iP = (num) => 
  {
      let str;
      let tt = new Array();
      tt[0] = (num >>> 24) >>> 0;
      tt[1] = ((num << 8) >>> 24) >>> 0;
      tt[2] = (num << 16) >>> 24;
      tt[3] = (num << 24) >>> 24;
      str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
      return str;
  }

  /**
 * [isEqualIPAddress 判断两个IP地址是否在同一个网段]
 * @param  {[String]}  addr1 [地址一]
 * @param  {[String]}  addr2 [地址二]
 * @param  {[String]}  mask  [子网掩码]
 * @return {Boolean}         [true or false]
 */
  isEqualIPAddress =  (addr1,addr2,mask) => {
      if(!addr1 || !addr2 || !mask){  
          this.setState({result:"各参数不能为空"});  
          return false;  
      }  
      var   
      res1 = [],  
      res2 = [];  
      addr1 = addr1.split(".");  
      addr2 = addr2.split(".");  
      mask  = mask.split(".");  
      for(var i = 0,ilen = addr1.length; i < ilen ; i += 1){  
          res1.push(parseInt(addr1[i]) & parseInt(mask[i]));  
          res2.push(parseInt(addr2[i]) & parseInt(mask[i]));  
      }  
      if(res1.join(".") == res2.join(".")){  
         this.setState({result:"在同一个网段"});  
          return true;  
      }else{  
        this.setState({result:"不在同一个网段"});  
          return false;  
      }  
}


  handleAddipResource = (e) => {

    const form = this.props.form;

    e.preventDefault();
      form.validateFields((err, values) => {
      
      if (!err) {
        const fields = {
          'ipaddress': JSON.stringify({data: this.state.data}),
          'mask':form.getFieldValue('mask')? form.getFieldValue('mask') :'',
          'remarks': form.getFieldValue('remarks') ? form.getFieldValue('remarks') :'',
          'typeid': this.state.selectedTypeValue,
          'purposeid':this.state.SelectPurposeValue
          }
      

         this.props.dispatch({
           type: 'gidc/addIpResource',
           payload:  fields
         });
     
         message.success('添加成功');

         this.setState({
           modalVisible: false,
         });
     
         form.resetFields();
      };
    });
  
    
  }

  handleLineStatus = e => {
    //已上线
    if ( e.target.value == 1 ) {
      this.setState({
        showFormProline: false,
        valueProline: e.target.value
        })
    } else {
      this.setState({
        showFormProline: true,
        valueProline: e.target.value
      })
    } 
  }


  handleSelectLineValue = (value) => {
    this.setState({
      selectedLineValue: value,
    });
  }

  handleSelectTypeValue = (value) => {
    this.setState({
        selectedTypeValue: value,
      });
  }

  handleSelectPurposeValue = (value) => {
    this.setState({
        SelectPurposeValue: value,
      });
  }
  
  handleCheckIp = (e) => {
    const form = this.props.form;
    e.preventDefault();
    
    const fields = {
      'ipaddr_begin': form.getFieldValue('ipaddr_begin')? form.getFieldValue('ipaddr_begin') :'',
      'ipaddr_end': form.getFieldValue('ipaddr_end')? form.getFieldValue('ipaddr_end') :'',
      'mask':form.getFieldValue('mask')? form.getFieldValue('mask') :'',
    }

    if (this.isEqualIPAddress(fields.ipaddr_begin,fields.ipaddr_end,fields.mask)) {
          this.handleCheckIpRequest(fields.ipaddr_begin,fields.ipaddr_end)     
    }
  }
  
  handleCheckIpRequest = (beginip,endip) => {

    let arr1 = new Array()
    let ipInt1 = this.ip2int(beginip);
    let ipInt2 = this.ip2int(endip);
    
    if ( ipInt2-ipInt1 > 255 ) {
        this.setState({ result: "输入的网段包含ip数量过大."})
        return
    } 
    else {
        for(let i = ipInt1;i <= ipInt2;i++) {
          arr1.push(this.int2iP(i))
        }

        this.setState({loading: true}) 
    
        this.props.dispatch({
          type: 'gidc/checkIpResource',
          payload: {
            ipaddress: JSON.stringify({data: arr1}),
          },
        })
        if (this.props.enable) {
          this.setState({
            result:"ip可以正常使用",
            data:arr1,
            enable: true
        })
        } else {
          this.setState({result:""})
        }
        
    }
  }
 

  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting,ipclassify,checkloading} = this.props;
    const {enable} = this.state
    console.log('ADD.props',this.props)
    
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    
    return (
      <div className={styles.tableListOperator} style={{float: 'left'}}>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            添加IP资源
        </Button>
        <Modal
          title="添加IP资源"
          visible={this.state.modalVisible}
          onOk={this.handleAddipResource}
          width={600}
          confirmLoading = {!enable}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            {...formItemLayout}
            label="IP网段起始地址"
          >
            {getFieldDecorator('ipaddr_begin', {
              rules: [{
                required: true, message: '请输入IP起始地址',
                pattern: /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
                message: '请输入正确ip地址'
              }],
            })(
              <Input placeholder="请输入IP起始地址" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="IP网段结束地址"
          >
            {getFieldDecorator('ipaddr_end', {
              rules: [{
                 message: '请输入IP段结束地址',
                 pattern:/^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
                 message: '请输入正确ip地址'
  
              }],
            })(
              <Input placeholder="不输入默认值等于IP段起始地址" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="掩码"
          >
            {getFieldDecorator('mask', {
              rules: [{
                required: true, message: '请输入网络地址掩码',
                pattern: /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/, 
                message: '请输入正确掩码',
              }],
            })(
              <Input placeholder="请输入网络地址掩码" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="网络类型"
          >
            {getFieldDecorator('typeid',{
              rules: [{
                required: true,
              }],
            }
            )(
              <Select
                placeholder="选择网络类型"
                style={{ width: 120 }}
                onChange = {this.handleSelectTypeValue} 
              >
                { 
                  ipclassify.data.iptype.length > 0 && ipclassify.data.iptype.map(post =>
                  <Option key={post.ID} value={post.ID} >{post.iptype}</Option>
                )
              }

              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="用途"
          >
            {getFieldDecorator('purposeid',{
              rules: [{
                required: true,
              }],
            }
            )(
              <Select
                placeholder="选择用途"
                style={{ width: 120 }}
                onChange = {this.handleSelectPurposeValue} 
              >
                { ipclassify.data.ippurpose.length > 0 && ipclassify.data.ippurpose.map(post =>
                  <Option key={post.ID} value={post.ID}>{post.iptitle}</Option>
                )
              }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="备注"
          >
            {getFieldDecorator('remarks', {
              rules: [{
                required: true, message: '备注',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="机房描述" rows={4} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="检测ip段"
          >  
          <Button icon="check" loading={checkloading} onClick={(e) => this.handleCheckIp(e)}>
            检测IP段
          </Button>
          <br />
             <span  style={{color:'#F00',font:'bold'}}> {this.state.result} </span>
          </FormItem>
          
        </Modal>
    </div>
    );
  }
}
