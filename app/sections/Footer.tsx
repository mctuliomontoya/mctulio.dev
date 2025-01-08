'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 5, bounce: 0 },
        opacity: { delay, duration: 0.3 },
      },
    }
  },
}

const draw__fast = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 3, bounce: 0 },
        opacity: { delay, duration: 0.4 },
      },
    }
  },
}

const draw__fast__2 = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.1 },
      },
    }
  },
}

export const FooterSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <div className='pb-2 text-foreground'>
      <motion.h2
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1 }}
        className='mt-10 mb-10 md:mt-16 text-center font-display text-4xl'
      >
        Contact me
      </motion.h2>
      <div className='text-center tracking-tighter'>
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className='my-2'
        >
          Sonora, México
        </motion.p>
        <a href='mailto:mctulio.dev@gmail.com' className='underline'>
          mctulio.dev@gmail.com
        </a>
        <div className='border-b border-foreground/30 my-10 md:my-16' />
        <div className='relative mt-16 md:mt-10'>
          <div className='mt-4 flex items-center justify-center'>
            Made with
            <span className='relative inline-flex mx-2 h-4 w-4'>
              <span className='animate-ping absolute top-0 right-0 inline-flex h-full w-full opacity-75'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z' />
                </svg>
              </span>
              <span className='relative inline-flex top-0 right-0 h-4 w-4 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z' />
                </svg>
              </span>
            </span>
            by
          </div>
        </div>
        <p> - Marco Montoya </p>
        <div
          className='w-full flex justify-center items-center text-center'
          style={{ minHeight: '200px' }} // Ajusta la altura mínima si es necesario
          ref={ref}
        >
          <AnimatePresence>
            {inView && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <motion.svg
                  version='1.1'
                  viewBox='0 0 120 180'
                  initial='hidden'
                  animate='visible'
                  className={'size-64 mt-3'}
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <motion.path
                    variants={draw}
                    className='path__sign'
                    strokeWidth={1}
                    d='M45.2323969,45.4394641 C45.2323969,45.4394641 55.8211665,45.4394641 76.9987057,45.4394641 C49.9340337,85.3276742 31.9455886,111.298175 23.0333704,123.350968 C14.7764017,134.517608 8.2819778,142.673763 3.55009883,147.819434 C-1.31037412,153.104944 72.5395067,51.9510639 72.5395067,51.9510639 C71.2555035,51.9510639 71.1052468,51.9510639 42.9643356,51.9510639 C42.401699,51.9510639 41.5490107,51.9510639 40.4062709,51.9510639 C61.0030495,21.1368121 72.411508,4.18018962 74.6316463,1.08119641 C77.9618537,-3.56729341 68.4166297,8.15375422 68.4166297,10.1863789 C68.4166297,11.541462 70.2143814,12.2304414 73.8098847,12.2533171 L44.2865956,58.1763364 L82.8606033,58.9564982 C76.2376265,59.2639597 73.4946408,60.4322983 74.6316463,62.4615139 C76.3371545,65.5053373 88.0447682,65.5053373 88.0447682,65.5053373 C88.0447682,65.5053373 48.3355406,64.0348024 48.3355406,64.0348024 C48.3355406,64.0348024 57.5519233,49.1638706 75.9846886,19.4220069 C67.9962807,30.0498245 64.831846,35.9620568 66.4913845,37.158704 C68.150923,38.3553511 70.8643436,37.8819645 74.6316463,35.7385441 C56.7982215,64.249411 45.7759301,81.2846018 41.5647722,86.8441165 C33.3186521,97.7305345 31.3402323,101.976501 19.298015,109.767671 C15.1908059,112.424986 11.2578295,113.592552 5.75104205,113.246991 C2.76101175,113.059361 0,111.034608 0,105.805222 C0,101.342183 1.63149796,97.7658607 7.64535626,92.3202317 C13.6592146,86.8746027 18.1731732,86.8746027 20.7652729,86.5347406 C41.6411022,83.7976148 54.7372428,119.636431 80.8466629,120.250899 C98.8859993,120.675443 103.516121,115.001021 119.083703,105.872858'
                    id='MainPath'
                    strokeLinecap='round'
                  ></motion.path>
                  <motion.path
                    variants={draw__fast}
                    className='path__sign'
                    custom={2}
                    strokeLinecap='round'
                    d='M78.4901104,14.6976763 C78.9814295,14.3137266 78.6241094,14.0650346 78.24442,14.0209122 C77.4707313,13.9310046 75.7963987,14.4681522 75.0198292,15.0362454 C72.3321441,17.0024001 73.4593957,17.7082667 73.8735709,17.8830975 C74.8291288,18.2864557 75.7235126,17.6194848 75.9946865,17.4797393 C78.0341089,16.4287522 81.3492483,13.3020372 79.6916786,14.8653947 C78.0341089,16.4287522 80.4667587,16.4356669 82.3810426,16.2233396 C84.2953265,16.0110123 84.8709971,14.7482591 85.2942503,15.1394317 C85.5642644,15.38898 83.1767471,17.617733 84.5665173,17.3146296 C85.9562876,17.0115261 87.9182957,15.9308365 90.4004119,16.2233396 C92.8825282,16.5158426 92.8825282,16.7504309 95.9790036,17.3146296 C98.788286,17.8264998 102.556449,17.6384336 107.283491,16.7504309'
                    id='Path-4'
                  ></motion.path>
                  <motion.path
                    variants={draw__fast}
                    className='path__sign'
                    custom={2}
                    strokeLinecap='round'
                    d='M79.4901104,38.6976763 C79.9814295,38.3137266 79.6241094,38.0650346 79.24442,38.0209122 C78.4707313,37.9310046 76.7963987,38.4681522 76.0198292,39.0362454 C73.3321441,41.0024001 74.4593957,41.7082667 74.8735709,41.8830975 C75.8291288,42.2864557 76.7235126,41.6194848 76.9946865,41.4797393 C79.0341089,40.4287522 81.7413011,36.4183179 80.693013,38.8509223 C80.3141706,39.7300448 80.9778213,40.5108672 81.6488933,40.3399141 C82.7075759,40.0702187 84.0009267,38.6012501 83.9493163,38.6976763 C83.4680092,39.5969261 82.4405086,41.6854369 83.0368995,42.0794326 C83.6332904,42.4734284 86.449469,39.4187989 87.4298181,38.4741862 C87.7817077,38.1351239 87.7817077,39.8588388 88.0432892,40.7504309 C88.0703426,40.8426416 90.2554686,38.1566714 91.2834915,36.4405594 C93.2349578,33.1829131 96.7316597,25.8102489 95.7926819,27.8736109 C94.8537042,29.936973 88.0408922,42.4981672 88.3327884,42.9245989 C88.6572773,43.3986454 89.9715928,40.2193707 91.7313406,40.3399141 C93.4910885,40.4604576 93.9367213,41.3330125 95.7926819,41.4797393 C97.6486426,41.626466 99.2731312,39.7200753 100.695027,40.3399141 C102.147708,40.9731726 103.576175,41.1848994 104.980428,40.9750946'
                    id='Path-4'
                  ></motion.path>
                  <motion.polyline
                    variants={draw__fast__2}
                    className='path__sign'
                    custom={4.5}
                    strokeLinecap='round'
                    id='Path-5'
                    points='80.687506 32.4230825 83.2436957 32.4230825 88.0718369 32.4230825 89.9628507 32.4230825 97.7154214 32.4230825 111.383271 32.4230825 114.36826 32.4230825'
                  ></motion.polyline>
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
