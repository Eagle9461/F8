import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Drawing from '@/components/FlowBuilder/Drawing';
import TipsMessage from '@/components/ConfirmMessage/TipsMessage';

import saveFramework from '@/redux/features/frameworks/frameworkSlice';

import styles from "./agents.module.scss";

const CreateMissingPart:React.FC = () => {
    const router = useRouter();

    const framework = useSelector((state:any) => state.framework.editingFramework);
    const [showTips, SetShowTips] = useState(true);

    const dispatch = useDispatch();


    const removeTips = () => {
        SetShowTips(false);
    }
    const onSave = async () => {
        await dispatch(saveFramework(fraemework));
    }
    const des = 
    `
        No action = No sale

        Sometime, your customer might not taking action. So we will make follow-up content to expose them to the value of your solution for them.

        We need “APPETIZER content” to motivate them to read your MAIN content.

        and “DESSERT content” to show our appreciation to them.

        By default we will pre-generate e-mail copy for each previously generated content.

        But definitely! You can ADD social media content for your appetizer content too.
    `;
    const onChange = (event:any) => {

    };
    const initBgColor = '#F5F1F7';

    const nodes = [
        {
          id: '1',
          type: 'mainSetNode',
          data: { onChange: onChange, color: initBgColor },
          style: {},
          position: { x: -500, y: -100 },
        },
        {
          id: '2',
          type: 'mainSetNode',
          data: { onChange: onChange, color: initBgColor },
          style: {},
          position: { x: -270, y: -100 },
        },
        {
          id: '3',
          type: 'mainSetNode',
          data: { onChange: onChange, color: initBgColor },
          style: {},
          position: { x: -270, y: 300 },
        },
        {
          id: '4',
          type: 'sourceNode',
          position: { x: 0, y: 50 },
          sourcePosition: 'right',
          targetPosition: 'left'
        },
        {
          id: '5',
          type: 'mainSetNode',
          data: { onChange: onChange, color: initBgColor },
          style: {},
          position: { x: 270, y: -100 },
        },
        {
          id: '6',
          type: 'mainSetNode',
          data: { onChange: onChange, color: initBgColor },
          style: {},
          position: { x: 520, y: -100 },
        },
      ];
    const edges = [
        {
          id: 'e1-2',
          source: '1',
          target: '2',
          animated: true,
          style: { stroke: '#f88' },
        },
        {
          id: 'e2-4',
          source: '2',
          target: '4',
          animated: true,
          style: { stroke: '#f88' },
        },
        {
          id: 'e3-4',
          source: '3',
          target: '4',
          animated: true,
          style: { stroke: '#f88' },
        },
        {
          id: 'e4-5',
          source: '4',
          target: '5',
          animated: true,
          style: { stroke: '#f88' },
        },
        {
          id: 'e5-6',
          source: '5',
          target: '6',
          animated: true,
          style: { stroke: '#f88' },
        },
      ];
    return(
        <div className={styles.choice}>
            <Drawing nodes={nodes} edges={edges} />
            <button onClick={onSave} className="btn btn-purple">Save Draft</button>
            <button onClick={onSave} className="btn btn-purple">Pause</button>
            <button onClick={onSave} className="btn btn-purple">Save & Run</button>

            {
                showTips && 
                <TipsMessage description={des} showTips={removeTips}/>
            }
        </div>
    );
  }

export default CreateMissingPart;