import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import Card from '@/components/card/NodeCard';
import style from "./drawing.module.scss";
import TextArea from '@/components/InputGroup/LockAvailableInput';

interface Props{
  data:any,
  isConnectable:boolean
}

const NodeTemplate:React.FC<Props> = ({ data, isConnectable }) => {
  return (
    <div className={style.node}>
      <Card cardClass="bg-pink">
        <div className={style.card}>
          <div className={style.info}>
            <span>Main Set</span>
            <span>Total Views:300</span>
          </div>
          <TextArea title="Main"/>
          <TextArea title="Apetizer"/>
          <TextArea title="Desired"/>
        </div>
      </Card>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
}
const SourceNodeTemplate:React.FC<Props> = ({data, isConnectable}) => {
  return(
    <div>
      <div className={style.sourcenode}>
        🎯 SUCCESFULLY SOLD
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </div>
  )
}

const Node = memo(NodeTemplate);
const SourceNode = memo(SourceNodeTemplate);

export { Node, SourceNode };