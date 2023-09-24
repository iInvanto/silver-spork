import { Injectable } from "@nestjs/common";

import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";

const numCPUs = availableParallelism();

@Injectable()
export class ClusterService {
  static clusterize(callback: () => void): void {
    // round-robin algorithm to distribute the requests among the processes
    if (cluster.isPrimary) {
      console.log(`Master Server (${process.pid}) is running.`);

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
      });
    } else {
      console.log(`Worker (${process.pid}) is running.`);
      callback();
    }
  }
}
