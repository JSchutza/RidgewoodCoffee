export default function About() {
  return (
    <section id="about" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]">
            <img
              src="/images/about.jpg"
              alt="Ridgewood Coffee interior"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2020, Ridgewood Coffee was born from a simple yet powerful idea: 
                to create a warm, welcoming space where coffee and community come together. 
                Our journey began with a passion for exceptional coffee and a deep commitment 
                to sustainable practices.
              </p>
              <p>
                We source our beans directly from small-scale farmers across the globe, 
                ensuring fair compensation and promoting sustainable farming practices. 
                Every cup we serve is a testament to our dedication to quality and our 
                respect for the craft of coffee making.
              </p>
              <p>
                Beyond being just a coffee shop, we're proud to be a cornerstone of the 
                Ridgewood community. We host local artists, support neighborhood initiatives, 
                and strive to be a space where connections are made and stories are shared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 