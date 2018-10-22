import React from 'react'
import { Icon, notification} from 'antd'

import style from './popEdit.less'


const openNotificationWithIcon = (type,content) => {
    notification[type]({
      message: '通 知 栏',
      description: content,
    });
  };

class PopEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editState: false,
            seqValue: this.props.seq,
        }
    }

    showPopEdit = () => {
        this.setState({
            editState: true,
        })
    }

    seqChange = e => {
        this.setState({
            seqValue: e.target.value,
        })
    }

    submitSeq = () => {
        // 确认修改，发送请求，并重新load table表数据，执行回调函数改变editState为false
  
        const { dispatch, seq, resId } = this.props

       
        const params = {
            seq: this.state.seqValue || seq,
            ID:  resId,
        }
        
        dispatch({
            type: 'gresource/modifyResourceSeq',
            payload: {
                description: params,
                cb: (info) => {
                    if (info.status == '200'){
                        openNotificationWithIcon('success',"修改资源顺序成功!~ ~")
                      } else {
                        openNotificationWithIcon('error',"修改资源顺序失败!~ ~")
                      }
                      // 刷新页面

                }
            },
        }) 

        this.setState({
            editState: false,
        })
    }

    cancel = () => {
        this.setState({
            editState: false,
            seqValue: this.props.seq,
        })
    }

    render() {
        const { editState, seqValue } = this.state
        const { seq } = this.props
        return (
            <div>
                {
                    !editState &&
                    <span onClick={this.showPopEdit} className={style['seq-text']}>{seq}</span>
                }
                {
                    editState &&
                    <div className={style['pop-edit']}>
                        <input
                            value={seqValue}
                            onChange={this.seqChange}
                            className={style['pop-edit-input']}
                        />
                        <button className={style['btn-ok']} onClick={this.submitSeq}>
                            <Icon type="check" theme="outlined" />
                        </button>
                        <button className={style['btn-cancel']} onClick={this.cancel}>
                            <Icon type="close" theme="outlined" />
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default PopEdit
