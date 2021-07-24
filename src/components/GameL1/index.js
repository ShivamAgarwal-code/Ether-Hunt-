import React, {useState, useEffect} from 'react';
import './styles.css';
import { updateState } from "../../redux/component1/actions";
import { useSelector, useDispatch} from 'react-redux';
import { BiChevronRightCircle } from "react-icons/bi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Web3 from 'web3';
import "../../truffle/build/contracts/VRFD20.json";

const GameL1 = () => {

    const compState = useSelector(state => state.component1reducer);
    const dispatch = useDispatch();
    const updateReduxState = (object) => {
        dispatch(updateState({...object}))
    }

    const [zones, setzones] = useState([]);
    const [amount, setamount] = useState(0.1);
    const [begin, setbegin] = useState(false);
    const [dialogS, setdialogS] = useState(false);
    const [markId, setmarkId] = useState(null);

    

    const setid = (e) => {
        setmarkId(parseInt(e.target.id))
        console.log(e.target.id)
    }

    const generateZones = () => {
        let marks = [];
        while(marks.length < 4){
            let coordinate = Math.floor(Math.random() * 1000) % 35;
            if(!marks.includes(coordinate)){
                marks.push(coordinate);
            }
        }
        let bufferZones = [];
        let k = 1
        for(var i = 0; i < 35; i++){
            if(marks.includes(i)){
                bufferZones.push(
                    <div id={i} className="mark" onClick={(e) => {
                        setdialogS(true);
                        setid(e)
                        console.log(marks.indexOf(parseInt(e.target.id)), markId)
                    }}>
                    </div>
                )
            }else{
                bufferZones.push(
                    <div>
                    </div>
                )
            }
        }
        setzones(bufferZones);
    }

    useEffect(() => {
        if(compState.game1position !== "left-full opacity-0" && begin){
            generateZones();
        }else{
            setzones([])
        }
    }, [compState.game1position, begin])

    return (
        <div className={`GameL1 ${compState.game1position}`}>
            <div className="flex h-screen w-screen pt-3 pb-3">
                <div className="w-1/3 h-full flex items-center flex-col">
                    <h5 className="mt-4 text-3xl font-bold text-center">
                        Level 1 of Crypto Hunt
                    </h5>
                    <span className="mt-32 text-xl text-center opacity-40">
                        place a amount to start the game
                    </span>
                    <div className="flex flex-row mt-10">
                        <label className="smBtn" onClick={() => {setamount(0.1)}}>
                            <span>0.1</span>
                        </label>
                        <label className="smBtn" onClick={() => {setamount(0.2)}}>
                            <span>0.2</span>
                        </label>
                        <label className="smBtn" onClick={() => {setamount(0.3)}}>
                            <span>0.3</span>
                        </label>
                        <label className="smBtn" onClick={() => {setamount(0.4)}}>
                            <span>0.4</span>
                        </label>
                    </div>
                    <div className="flex flex-row mt-3 mb-3 items-center">
                        <div onClick={() => {
                            let m = amount;
                            m = m - 0.1;
                            if(m >= 0){
                                setamount(parseFloat(m.toFixed(5)))
                            }
                        }} >
                            <AiOutlineMinus size={40} />
                        </div>
                        <label className=' border-2 border-white rounded-md h-16 w-60 p-2 '>
                            <input type="number" className=" border-0 w-full h-full bg-transparent text-3xl" 
                            value={amount}
                            onChange={e => {
                                console.log(typeof(e.target.value))
                                if(e.target.value >= 0){
                                    setamount(e.target.value);
                                }
                            }} />
                        </label>
                        <div onClick={() => {
                            let m = amount;
                            m = m + 0.1;
                            if(m >= 0){
                                setamount(parseFloat(m.toFixed(5)))
                            }
                        }} >
                            <AiOutlinePlus size={40} />
                        </div>
                    </div>
                    <div className="btn" onClick={() => setbegin(true)}>
                        <span className=" text-white font-bold text-xl">Begin Hunt</span>
                    </div>
                </div>
                <div className="h-full map flex justify-center items-center p-10">
                    <div className="grid grid-cols-6 grid-rows-6 gap-2 h-4/5 w-4/5">
                        {zones.map(item => item)}
                    </div>
                </div>
                <div className=" w-20 h-full flex justify-center items-center">
                    <BiChevronRightCircle size={60} color={"grey"} onClick={()  => {setbegin(false);setamount(0.1) ;updateReduxState({game1position: "left-full opacity-0"}); }} />
                </div>
            </div>
            {dialogS && <Dialog close={() => setdialogS(false)} id={markId} amount={amount} />}
        </div>
    )
}

export default GameL1

const Dialog = (props) => {
    const [confirmed, setconfirmed] = useState(false);
    const [isCompleted, setisCompleted] = useState(false)
    const [ac, setac] = useState(null)

    const loadweb3 = async () => {
        if(window.etherium){
            window.web3 = new Web3(window.etherium);
            await window.etherium.enable()
            console.log(window.web3)
        }else if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
            console.log(window.web3)
        }else{
            window.alert("install metamask")
        }
    }

    const loadblockChain = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const netid = await web3.eth.net.getId();
        // const netdata = VRFD20.networks[netid];s
        if(netid){

        }{
            // window.alert(netid)
        }
    }

    useEffect(() => {
        loadweb3();
        loadblockChain()
    }, [])
    useEffect(() => {
        isCompleted ? setconfirmed(true) : <></>
    }, [isCompleted])
    return (
        <div className="h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center absolute">
            <div 
            onClick={() => {confirmed ? props.close() : <></>}}
            className="h-screen z-0 w-screen bg-black bg-opacity-50 flex justify-center items-center absolute"></div>

            {!confirmed && <div className="bg-white z-10 text-center h-56 w-96 text-black flex items-center p-5 flex-col justify-center rounded-md">
                <span className="font-bold">Are you sure you want to chooses this mark?</span>
                <span className="font-bold">Address : {ac}</span>
                <span className="font-bold">Amount : {props.amount}</span>
                <div className="mt-10 smBtn" onClick={() => {setconfirmed(true); window.web3.eth.sendTransaction({to: "0x393aa1655A4813863397596d31f1c0f37a7Aa220", from: "0x393aa1655A4813863397596d31f1c0f37a7Aa220", value: window.web3.toWei(props.amount, 'ether')})}}>
                    <span>OK</span>
                </div>
            </div>}
            {confirmed && <div className="bg-white z-10 h-56 w-96 text-black flex items-center p-5 flex-col justify-center rounded-md">
                <span className="font-bold text-center">Please wait while we are searching for treasure for you...</span>
                
            </div>}
        </div>
    )
}
