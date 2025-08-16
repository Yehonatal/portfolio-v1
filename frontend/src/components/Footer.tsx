// import { Mail, Phone, MapPin } from 'lucide-react'

const FooterSection = () => {
  return (
    <section
      data-aos="fade-up"
      data-aos-delay="100"
      className="max-w-5xl mx-auto py-10"
    >
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black dark:text-white">
        <div>
          <h3 className="text-xl font-semibold mb-4">Let’s connect 🤝</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-md">
            Feel free to reach out for collaborations, questions, or just a
            techie chat. I’m always happy to talk!
          </p>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <span>
                <strong>Email:</strong> yonatanafewerk@gmail.com
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <span>
                <strong>Phone:</strong> +251 966 339 226
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>
                <strong>Location:</strong> Ethiopia (remote-friendly)
              </span>
            </li>
          </ul>
        </div>
      </div> */}

      {/* Footer Note */}
      <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-600">
        © {new Date().getFullYear()} Yonatan Afewerk. All rights reserved.
      </div>
    </section>
  )
}

export default FooterSection
