import React, { forwardRef, useState, useEffect, useRef } from 'react';
import BetterScroll from 'better-scroll';
import classNames from 'classnames';
import './style.less';

const TIME_BOUNCE = 800;
const THRESHOLD = 70;
const STOP = 56;

const Bscroll = forwardRef((props, ref) => {
  // height 是必选 prop
  const { height, refreshFn, loadMoreFn, isNoMore, loadingMore, betterScrollRefreshId } = props;
  // console.log(height)
  const bsRef = useRef(null);

  const [beforePullDown, setBeforePullDown] = useState(true);
  const [isPullingDown, setIsPullingDown] = useState(false);

  const [isPullUpLoad, setIsPullUpLoad] = useState(false);
//上滑
  const pullingUpHandleRef = useRef(null);
  async function pullingUpHandle() {
    console.log('pullingUp');
    bsRef.current.finishPullUp(); // 这句东西是天意，请不要瞎改了，改了出现什么问题你handle不了的，better-sroll库作者可能都不知道怎么修
    if (isNoMore || loadingMore) return;
    setIsPullUpLoad(true);

    await loadMoreFn();

    bsRef.current.finishPullUp();
    bsRef.current.refresh();
    setIsPullUpLoad(false);
  }
  useEffect(() => {
    pullingUpHandleRef.current = pullingUpHandle;
  });
//下拉
  const pullingDownHandleRef = useRef(null);
  async function pullingDownHandle() {
    setBeforePullDown(false);
    setIsPullingDown(true);

    await refreshFn();
    
    setIsPullingDown(false);
    bsRef.current.finishPullDown();
    
    setTimeout(() => {
      setBeforePullDown(true);
      bsRef.current.refresh();
    }, TIME_BOUNCE);
  }
  useEffect(() => {
    pullingDownHandleRef.current = pullingDownHandle;
  });

  useEffect(() => {
    bsRef.current && bsRef.current.refresh();
  }, [betterScrollRefreshId]);

  useEffect(() => {
    bsRef.current = new BetterScroll(ref.current, {
      bounce:false,//是否启用回弹动画效果
      click:true,
      bounceTime: TIME_BOUNCE,
      pullDownRefresh: refreshFn
        ? {
            threshold: THRESHOLD,
            stop: STOP,
          }
        : false,
      pullUpLoad: loadMoreFn
        ? {
            threshold: 180,
          }
        : false,
    });

    bsRef.current.on('pullingUp', async () => {
      await pullingUpHandleRef.current();
    });

    bsRef.current.on('pullingDown', async () => {
      await pullingDownHandleRef.current();
    });
  }, []);

  useEffect(() => {
    bsRef.current.refresh();
  }, [height]);
// console.log(!refreshFn,!beforePullDown,!isPullingDown)
  return (
    <div style={{ height }} ref={ref} className='bscroll-wrapper'>
      <div className='bscroll-content'>
        <div className={classNames('pulldown-wrapper', { 'bs-hidden': !refreshFn })}>
          <div
            className={classNames({
              'bs-hidden': !beforePullDown,
            })}
          >
            <span>下拉刷新</span>
          </div>
          <div className={classNames({ 'bs-hidden': beforePullDown })}>
            <div className={classNames({ 'bs-hidden': !isPullingDown })}>
              <span>正在刷新...</span>
            </div>
            <div className={classNames({ 'bs-hidden': isPullingDown })}>
              <span>刷新完成</span>
            </div>
          </div>
        </div>

        <div style={{ minHeight: height + 1 }}>{props.children}</div>
        <div className={classNames('pullup-wrapper', { 'bs-hidden': !loadMoreFn })}>
          <div className={classNames({ 'bs-hidden': !isNoMore })}>
            <span className='pullup-txt'>已经到尽头了</span>
          </div>
          <div className={classNames({ 'bs-hidden': isNoMore || !isPullUpLoad })}>
            <span className='pullup-txt'>正在加载...</span>
          </div>
          <div className={classNames({ 'bs-hidden': isNoMore || isPullUpLoad })}>
            <span className='pullup-txt'>上拉加载更多</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Bscroll;
