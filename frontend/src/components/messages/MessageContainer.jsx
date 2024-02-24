import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from 'react-icons/ti'
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const {selectedConversation,setSelectedConversation} = useConversation();
	useEffect(()=>{
		// cleaned up 
		return ()=> setSelectedConversation(null);
	},[setSelectedConversation])
	const [display, setDisplay] = useState('');
	useEffect(()=>{
		if(selectedConversation){
            setDisplay('hidden');
        }
	},[display])

	const handleClick = (e) => {
		setSelectedConversation(null);
	}
	return (
		<div className={`md:min-w-[450px] h-auto max-sm:${selectedConversation?'':'hidden'} max-sm:h-[550px] max-sm:w-[100vw]  bg-slate-400 flex flex-col`}>
			{!selectedConversation ? (<NoChatSelected />)
				:
				(<>
					{/* Header */}
					<div className='bg-white px-4 py-2 mb-2'>
						<span onClick={handleClick} className="text-black font-bold mr-3">back</span>
						<span className='label-text font-bold text-black'>To:</span> <span className='text-black font-bold'>{selectedConversation.fullName}</span>
					</div>

					<Messages />
					<MessageInput />
				</>)
			}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const {authUser} = useAuthContext();
	
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} </p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};