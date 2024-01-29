import { faCameraAlt, } from '@fortawesome/free-solid-svg-icons';
import PageHeader from './PageHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PersonInfo } from '../utils/fakerWork';

const Settings = () => {
    return (
        <section className='order-2 w-full md:border-r md:w-[40%] relative'>
            <PageHeader pageName={"Settings"} />
            <section className='flex justify-center flex-col overflow-y-auto'>
                {/* profile pic */}
                <section className='w-[200px] mt-[70px] m-auto flex justify-center items-center'>
                    <section className="relative w-[100px] h-[100px] ">
                        <img src={PersonInfo().avatarUrl} alt="" className='rounded-full object-contain border-[3px] border-blue-200 w-full h-full' />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control  */}
                        <label htmlFor='fileInput' className='absolute right-0 bottom-0'>
                            <span className='relative'>
                                <FontAwesomeIcon icon={faCameraAlt} className='text-lg text-white bg-blue-400 p-[8px] ml-5 rounded-full ' />
                                <input type="file" name="" id="fileInput" className='bg-yellow-500 w-0 invisible' />

                            </span>
                        </label>
                    </section>
                </section >

                {/* user information */}
                <section className="text-center font-rale text-l font-medium pt-4 w-fit m-auto">{PersonInfo().username} </section>
                <section className="text-center font-rale text-sm font-light text-gray-500 w-fit m-auto">{PersonInfo().username} </section>
                <form className="w-full h-fit flex mt-[35px] flex-col items-center gap-4">

                    <input type="text" name="username" className="h-[36px] py-[1px] pr-0 pl-[4px] bg-white border-b border-zinc-500 text-base font-normal text-neutral-700 active:border-zinc-800 outline-none w-[70%] " id="" placeholder="Change username" />
                    <input type="text" name="bio" className="h-[36px] py-[1px] pr-0 pl-[4px] bg-white border-b border-zinc-500 text-base font-normal text-neutral-700 active:border-zinc-800 outline-none w-[70%]" id="" placeholder="Bio" />

                    {/* passwords */}
                    <section className="w-[80%] mt-10 flex flex-col gap-3">
                        <section className="my-1">Password</section>
                        <input type="password" name="" className="h-[36px] py-[1px] pr-0 pl-[4px] bg-white border rounded border-zinc-500 text-base font-normal text-neutral-700 active:border-zinc-800 outline-none md:w-full" id="" placeholder="New password" />
                        <input type="password" name="" className="h-[36px] py-[1px] pr-0 pl-[4px] bg-white border rounded border-zinc-500 text-base font-normal text-neutral-700 active:border-zinc-800 outline-none md:w-full" id="" placeholder="Change password" />
                    </section>
                    <button className='w-[128px] h-[33px] px-3.5 py-[7px] font-rale  bg-blue-600 rounded-[5px] border border-neutral-500 flex items-center justify-center text-white text-base font-normal hover:bg-blue-700 active:bg-blue-800 outline-none  '
                    >Update
                    </button>
                </form>
            </section>
        </section>
    )
}
export default Settings