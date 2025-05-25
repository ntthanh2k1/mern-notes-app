const EmptyNote = ({ image, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {image}

      <p className="w-1/2 text-xl font-medium text-slate-800 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyNote;