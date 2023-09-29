'use-client';

const MessageModal = ({ message, isDisplayed }) => (
    <div>
      {isDisplayed && (
        <div className="w-full h-full fixed flex-center">
          <div className="flex-center shadow-xl rounded-xl bg-white w-[300px] h-[100px] p-4">
            <p className="text-lg">{message}</p>
          </div>
        </div>
      )}
    </div>
  );

  export default MessageModal;