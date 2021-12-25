import Flex from "@react-css/flex";

export function BaseSettings() {
  return (
    <div style={{ height: "30rem" }} className="w-auto">
      <h2>Base Settings</h2>
      <Flex alignContentCenter className="w-auto" column>
        <Flex className="mx-auto" column>
          <img
            src="https://www.gran-turismo.com/gtsport/decal/8080091058926551576_1.png"
            className="w-50 m-auto"
            draggable="false"
          />
          <p>Welcome to settings! To get started, select a menu on the left!</p>
        </Flex>
      </Flex>
    </div>
  );
}
