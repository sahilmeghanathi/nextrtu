const BackgroundOverlay = () => {
  return (
    <section>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-125 w-125 rounded-full bg-[#4f98a1]/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-125 w-125 rounded-full bg-[#3f848d]/20 blur-3xl" />
      </div>
    </section>
  );
}

export default BackgroundOverlay;