const TemplateCard = () => {
  return (
    <div className="card card-bordered bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Template A</h2>
        <p>Description here</p>
        <div className="card-actions justify-end">
          <button className="btn">View</button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
