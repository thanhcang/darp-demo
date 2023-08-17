import {CommunicationProtocolEnum, DaprClient} from "@dapr/dapr";
import {daprHost, daprPort} from "./dapr.config";

export class DaprIntegrationService {
  static getHttpLayer(): DaprClient {
    return new DaprClient({
      daprHost,
      daprPort,
      communicationProtocol: CommunicationProtocolEnum.HTTP,
      maxBodySizeMb: 10
    })
  }

  static getGrpcLayer(): DaprClient {
    return new DaprClient({ daprHost, daprPort, communicationProtocol: CommunicationProtocolEnum.GRPC })
  }
}
