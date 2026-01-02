import React from "react";
import Back from "./ClientComponents/Back";

function Teams() {
  return (
    <section className="min-h-screen pt-34 bg-gray-50 py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <Back />
        <h1 className="text-4xl font-bold mb-6 ">Bookflix Terms of Use</h1>

        <p className="mb-6 text-gray-700  text-sm">
          Bookflix provides a personalized subscription service that allows
          members to access entertainment content (“Bookflix content”) over the
          Internet on certain Internet-connected TVs, computers, and other
          devices ("Bookflix ready devices").
        </p>

        <section className="mb-8  text-sm">
          <h2 className="text-2xl font-semibold mb-4">Membership</h2>
          <p className="text-gray-700 mb-2">
            Your Bookflix membership will continue until terminated. To use the
            Bookflix service, you must have Internet access and a Bookflix ready
            device, and provide one or more Payment Methods.
          </p>
          <p className="text-gray-700 mb-2">
            Unless you cancel before your billing date, you authorize us to
            charge your Payment Method for the next billing cycle.
          </p>
        </section>

        <section className="mb-8  text-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Billing and Cancellation
          </h2>
          <p className="text-gray-700 mb-2">
            The subscription fee and any applicable taxes or fees will be
            charged to your Payment Method on the payment date shown in your
            account.
          </p>
          <p className="text-gray-700 mb-2">
            You may cancel your membership at any time. Your access will
            continue until the end of your billing period. Payments are
            non-refundable.
          </p>
        </section>

        <section className="mb-8  text-sm">
          <h2 className="text-2xl font-semibold mb-4">Bookflix Service</h2>
          <p className="text-gray-700 mb-2">
            Bookflix content is for personal, non-commercial use and may not be
            shared beyond your household unless allowed by your subscription
            plan.
          </p>
          <p className="text-gray-700 mb-2">
            You agree to use Bookflix and all features in accordance with
            applicable laws and restrictions. Unauthorized copying,
            redistribution, or commercial use is prohibited.
          </p>
          <p className="text-gray-700 mb-2">
            Offline downloads may be available on certain devices with
            limitations. Content availability varies by location and device
            capabilities.
          </p>
        </section>

        <section className="mb-8  text-sm">
          <h2 className="text-2xl font-semibold mb-4">Account and Passwords</h2>
          <p className="text-gray-700 mb-2">
            You are responsible for activity that occurs through your Bookflix
            account. Do not share your password or payment details.
          </p>
          <p className="text-gray-700 mb-2">
            Maintain accurate contact information to receive account notices.
          </p>
        </section>

        <section className="mb-8  text-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Warranties and Liability
          </h2>
          <p className="text-gray-700 mb-2">
            Bookflix service is provided "as is" without warranties. We are not
            liable for interruptions or errors. Consumer protection laws apply
            where mandatory.
          </p>
        </section>

        <section className="mb-8  text-sm">
          <h2 className="text-2xl font-semibold mb-4">Miscellaneous</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Governing Law: Terms are governed by the laws of the united
              kingdom.
            </li>
            <li>
              Unsolicited Materials: Bookflix does not accept unsolicited
              content ideas.
            </li>
            <li>
              Customer Support: Visit the Bookflix Help Center for assistance.
            </li>
            <li>
              Changes to Terms: Bookflix may update these terms. You can cancel
              your membership if you do not accept changes.
            </li>
            <li>
              Force Majeure: Bookflix is not liable for service interruptions
              caused by events beyond our reasonable control.
            </li>
          </ul>
        </section>

        <p className="text-gray-500 text-sm text-center mt-12">
          Last Updated: {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}

export default Teams;
