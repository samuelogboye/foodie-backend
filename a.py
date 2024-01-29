from multiprocessing import Pool
import time

COUNT = 50000000
def countdown(n):
    while n>0:
        n -= 1

if __name__ == '__main__':
    pool = Pool(processes=4)
    start = time.time()
    r1 = pool.apply_async(countdown, [COUNT//4])
    r2 = pool.apply_async(countdown, [COUNT//4])
    r3 = pool.apply_async(countdown, [COUNT//4])
    r4 = pool.apply_async(countdown, [COUNT//4])
    pool.close()
    pool.join()
    end = time.time()
    print('Time taken in seconds -', end - start)