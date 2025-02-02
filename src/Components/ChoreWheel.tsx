import { useEffect, useRef, useState } from 'react';
import apiFetch from '../apiFetch.js';

interface Chores {
  id: number;
  task_name: string;
  type: string;
  assigned_to: string | null;
  status: string;
  due_date: Date | null;
  created_at: Date | null;
}

//; CHORE WHEEL COMPONENT
function ChoreWheel() {
  const [allRoomiesMap, setAllRoomiesMap] = useState<Roomies[]>([]);
  const [allChoresMap, setAllChoresMap] = useState<Chores[]>([]);
  const [roomieUpdated, setRoomieUpdated] = useState<boolean>(false);
  const [choreUpdated, setChoreUpdated] = useState<boolean>(false);

  const containerRef = useRef(null);
  const [rotation, setRotation] = useState<number>(0);

  // get chores
  const getChores = async () => {
    try {
      const result = await apiFetch.getChores();
      setAllChoresMap(result);
    } catch (err) {
      console.error('This is the ChoreList useEffect error: ', err);
    }
  };

  // get users
  const getUser = async () => {
    try {
      const result = await apiFetch.getUsers();
      const usersObjArr = [...result];
      setAllRoomiesMap(usersObjArr);
    } catch (err) {
      console.error('This is the Household useEffect error: ', err);
    }
  };

  // ; USEEFFECT FOR RERENDER IN CHORE CREATION AND DELETION
  useEffect(() => {
    getChores();
  }, [choreUpdated]);

  // ; USE-EFFECT TO RERENDER WHEN NEW ROOMIE IS CREATED
  useEffect(() => {
    getUser();
  }, [roomieUpdated]);

  //; CHORE WHEEL ANIMATION
  useEffect(() => {
    let startTime: number;
    const duration = 1000; // 5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < duration) {
        const newRotation = (elapsed / duration) * 360; // Gradually rotate from 0 to 360 degrees
        setRotation(newRotation);
        requestAnimationFrame(animate);
      } else {
        setRotation(360); // Ensure it stops at a full rotation
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // useEffect(()=>{
  //   console.log('chores',allChoresMap[0].task_name);
  //   console.log('roomies',allRoomiesMap[0].username);
  // });

  /**
   *
   */

  // const items = [

  // ]

  const items = ['josh walk the dog', 'Austin wash dog', 'Aditi sweep floors'];
  const choreWheelContainerStyle = {
    boxShadow: `
        10px 10px 25px -3px rgba(0, 0, 0, 0.3),
        10px 4px 6px -2px rgba(0, 0, 0, 0.3),
        10px 20px 25px -5px rgba(0, 0, 0, 0.2),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
  };
  const choreWheelStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: 'transform 0s linear',
  };

  return (
    <>
      <div
        className='p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px]
             border-5'
        id='ChoreWheel'
      >
        <h1 className='text-2xl font-display font-semibold text-sky-900'>
          Chore Wheel
        </h1>
        <div id='wheelContainer' className='flex justify-center m-10'>
          <div
            id='wheel'
            className='flex-none rounded-full'
            style={choreWheelContainerStyle}
          >
            <div
              ref={containerRef}
              className='relative w-120 h-120 rounded-full overflow-hidden'
              style={choreWheelStyle}
            >
              {Array.from(items).map((_, i) => (
                <div
                  key={i}
                  className='absolute w-full h-full'
                  style={{
                    borderRadius: '50%',
                    clipPath: `polygon(50% 50%, ${
                      50 +
                      100 * Math.cos((i * (360 / items.length) * Math.PI) / 180)
                    }% ${
                      50 +
                      100 * Math.sin((i * (360 / items.length) * Math.PI) / 180)
                    }%, ${
                      50 +
                      100 *
                        Math.cos(
                          ((i + 1) * (360 / items.length) * Math.PI) / 180
                        )
                    }% ${
                      50 +
                      100 *
                        Math.sin(
                          ((i + 1) * (360 / items.length) * Math.PI) / 180
                        )
                    }%)`,
                    backgroundColor: `hsl(${i * 60}, 70%, 60%)`,
                  }}
                >
                  <span
                    className='absolute text-white font-bold'
                    style={{
                      top: `calc(50% + ${
                        30 *
                        Math.sin(
                          ((i + 0.5) * (360 / items.length) * Math.PI) / 180
                        )
                      }%)`,
                      left: `calc(50% + ${
                        30 *
                        Math.cos(
                          ((i + 0.5) * (360 / items.length) * Math.PI) / 180
                        )
                      }%)`,
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      width: '50px',
                    }}
                  >
                    {items[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoreWheel;
