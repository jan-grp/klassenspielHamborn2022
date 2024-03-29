import Image from 'next/image'
import { motion } from 'framer-motion'

import styles from './actor.module.css'

const ActorContainer = ({
    actorName,
    actorImage
}) => {

    return (
        <motion.div
            className={styles.window}
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
            <div className={styles.imageDiv}>
                <Image 
                    alt="gabriel"
                    src={actorImage}
                    className={styles.image}
                    width={240}
                    height={240}
                    objectFit="cover"
                />
            </div>

            <p className={styles.name}>{actorName}</p>

            <p className={styles.spielt}>Spielt:</p>
        </motion.div>
    )
}

export default ActorContainer