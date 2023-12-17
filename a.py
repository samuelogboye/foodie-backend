import threading

def task1():
    # Some computation or operation
    result = 0
    for i in range(1000000):
        result += i
    print(f"Task 1 Result: {result}")

def task2():
    # Another computation or operation
    result = sum(range(1000000))
    print(f"Task 2 Result: {result}")

def run_async_tasks():
    # Create threads for each task
    thread1 = threading.Thread(target=task1)
    thread2 = threading.Thread(target=task2)

    # Start the threads
    thread1.start()
    thread2.start()

    # Ensure all threads complete before continuing (optional)
    thread1.join()
    thread2.join()

# Call the function to execute tasks asynchronously
run_async_tasks()
