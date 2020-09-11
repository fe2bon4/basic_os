const DEFAULT_METADATA = {
  enqueued: 0,
  dequeued: 0,
  name: "default",
};

class Queue {
  // Initialize Queue.
  constructor(name = "default") {
    this.metadata = { ...DEFAULT_METADATA, name };
    this.store = {};
  }

  // getMetaData() - Returns Queue State
  getMetaData() {
    return this.metadata;
  }

  // enqueue(data) - Enqueue Data to Queue
  enqueue(data) {
    this.store[this.metadata.enqueued++] = {
      data,
    };
  }

  // dequeue() - Dequeue Data from Queue, return null if queue is exhausted.
  dequeue() {
    const { enqueued, dequeued } = this.metadata;

    if (enqueued === dequeued) {
      return null;
    }

    return this.store[this.metadata.dequeued++].data;
  }

  // peek() - Peek Last item to be dequeued, return null if queue is exhausted.
  peek() {
    const { enqueued, dequeued } = this.metadata;
    if (enqueued === dequeued) {
      return null;
    }
    return this.store[dequeued].data;
  }

  // seek(index) - Return data at index of Queue, return null if index is greater than items enqueued.
  seek(index) {
    const { enqueued } = this.metadata;
    if (index > enqueued) {
      return null;
    }
    return this.store[index].data;
  }
}

module.exports = Queue;
