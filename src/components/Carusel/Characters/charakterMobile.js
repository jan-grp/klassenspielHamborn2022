import { motion } from 'framer-motion'

import styles from './character.module.css'

const CharakterContainerMobile = ({
    characterName,
    characterDescription
}) => {

    return(
        <motion.div
            className={styles.windowMobile}
            initial={{
                opacity: 0,
                y: 200
            }}
            whileInView={{ 
                opacity: 1,
                y: 0,
                x: 0
            }}
            viewport={{ once: true, margin: "-80px" }}
        >
            <p className={styles.nameMobile}>{characterName}</p>

            <p className={styles.textMobile}>
                {characterDescription}
            </p>
        </motion.div>
    )
}

export default CharakterContainerMobile