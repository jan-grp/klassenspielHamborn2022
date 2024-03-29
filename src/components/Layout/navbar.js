import { useState, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

import styles from './navbar.module.css'
import { HiOutlineMenu } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'

import { NavigationContext, NavigationOptionsContext } from '../../utils/context/navigation.context'

import { scrollTo } from '../../utils/scroll'

import DropdownMenu from '../Dropdown/index'

const Window = styled.div`
    height: 50px;
    background-color: rgba(29,29,31,0.92);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10000;
    margin-bottom: 50px;

    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    padding-left: 20px;

    justify-content: center;
    border-bottom: rgb(0, 0, 0) solid 2px;
`

const ScrolledWindow = styled.div`
    height: 50px;
    background-color: ${props => props.backgroundcolor || 'rgba(29,29,31,0.92)'};
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10000;
    margin-bottom: 50px;

    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    border-bottom: ${props => props.backgroundcolor ? "" : "rgb(0, 0, 0) solid 2px"}
`

const Navbar = () => {
    const navigationContext = useContext(NavigationContext)
    const navigationOptionsContext = useContext(NavigationOptionsContext)

    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState('rgba(29,29,31,0.92)')

    useEffect(() => {
        if(navigationContext.name !== "Top") {
           setScrolled(true)
        } else {
            setScrolled(false)
        }
    }, [navigationContext])

    const toggleMenu = () => {
        if(!isOpen) {
            setIsOpen(true)
            setBackgroundColor('rgb(26, 26, 26)')
        } else {
            setIsOpen(false)
            setBackgroundColor('rgba(29,29,31,0.92)')
        }
    }

    const scrollToTop = () => {
        scrollTo({ ref: navigationOptionsContext[0].ref, duration: 800, offset: -1000 })
    }

    return (
        <>
            {
                // menu is open
                isOpen && <ScrolledWindow
                    backgroundcolor={backgroundColor}
                >
                    <p 
                        className={styles.title}
                    >
                        Club der Toten Dichter
                    </p>

                    <AnimatePresence
                        exitBeforeEnter
                    >
                        <motion.div 
                            className={styles.menuIcon}
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                            exit={{ x: 100 }}
                            key="menuIcon"
                            whileTap={{
                                scale: .8
                            }}
                            onClick={() => toggleMenu()}
                        >
                            {!isOpen && <HiOutlineMenu size={25}/>}
                            {isOpen && <IoMdClose size={25}/>}
                        </motion.div>
                    </AnimatePresence>

                    <DropdownMenu close={() => setIsOpen(false)}/>
                </ScrolledWindow>
            }

            {
                // menu available but closed
                !isOpen && <ScrolledWindow

                >
                    <p 
                        className={styles.title}
                        onClick={() => scrollToTop()}
                    >
                        Club der Toten Dichter
                    </p>

                    <AnimatePresence
                        exitBeforeEnter
                    >
                        <motion.div 
                            className={styles.menuIcon}
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                            exit={{ x: 100 }}
                            key="menuIcon"
                            whileTap={{
                                scale: .8
                            }}
                            onClick={() => toggleMenu()}
                        >
                            {!isOpen && <HiOutlineMenu size={25}/>}
                            {isOpen && <IoMdClose size={25}/>}
                        </motion.div>
                    </AnimatePresence>

                    {isOpen && <DropdownMenu />}
                </ScrolledWindow>
            }

            {/* {
                // menu is closed
                !isOpen && <Window>
                    <p className={styles.title}>Club der Toten Dichter</p>

                    {isOpen && <DropdownMenu />}
                </Window>
            } */}
        </>
    )
}

export default Navbar