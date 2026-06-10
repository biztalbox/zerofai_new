import type { Metadata } from "next";
import Link from "next/link";
import { NavigationBar } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Terms of Use | ZeroFAI",
  description:
    "Detailed guidelines defining user rights, obligations, and service usage policies.",
};

export default function TermsConditionPage() {
  return (
    <main className="bridge-page min-h-screen bg-white text-[#3d3d3d]">
      <NavigationBar />

      <section className="bg-[#1a2e24] px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto container">
          <h1 className="text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem] lg:text-[2.75rem]">
            Terms of use
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/85 md:text-base">
            Date: November 10, 2021
          </p>
        </div>
      </section>

      {/* Content */}
      <section id="terms-and-conditions" className="container px-6 py-16 lg:px-10 lg:py-20">
        <h2 className="text-[1.75rem] font-normal tracking-[-0.02em] text-[#3d3d3d] lg:text-[2rem]">
          Overview
        </h2>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#767676]">
          Terms & Conditions
        </p>
        <h3 className="mt-3 text-[1.25rem] font-normal tracking-[-0.02em] text-[#3d3d3d] lg:text-[1.5rem]">
          Team Computers Private Limited (TCPL)
        </h3>

        <div className="mt-8 space-y-10">
            <div className="space-y-4">
              <p className="text-foreground/75 dark:text-white/70">
                These Terms of Service apply to the ordering, purchase and
                delivery of products and services on{" "}
                <Link
                  href="https://www.teamcomputers.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  https://www.teamcomputers.com
                </Link>
                . Products purchased through the Webpage are sold and
                distributed by Team Computers Private Limited (“TCPL” or “Team
                Computers” or “Seller”). This Webpage is managed and operated
                by TCPL and all responsibilities and liabilities in respect to
                operating this Webpage is on TCPL only.
              </p>

              <p className="text-foreground/75 dark:text-white/70">
                The Products on the Webpage are only available for purchase in
                India.
              </p>

              <p className="text-foreground/75 dark:text-white/70">
                Please note that when you access and use the Webpage for a
                purchase transaction, your information will be collected and
                stored in accordance with the terms of use and privacy policy
                provided by Team Computers and, inter alia, through registration
                requirements.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                Orders
              </h3>
              <p className="text-foreground/75 dark:text-white/70">
                You can place an order for the Products by following the
                instructions on the Webpage. We will email you an order
                confirmation after we have received your Order (“Order
                Confirmation”). An Order Confirmation or processing of your
                Order does not constitute acceptance of your Order. All Orders
                are subject to our acceptance.
              </p>

              <p className="text-foreground/75 dark:text-white/70">
                We reserve the right (at our sole discretion) to decline, reject
                or limit your Order, for various reasons including, if:
              </p>

              <ul className="list-disc space-y-2 pl-5 text-foreground/75 dark:text-white/70">
                <li>
                  You do not accept these Terms and Conditions (including the
                  Privacy Policy).
                </li>
                <li>
                  You do not provide a valid shipping address within India or
                  provide an incorrect address.
                </li>
                <li>Your payment for the order is unsuccessful.</li>
                <li>
                  The Product you have ordered is not available or will not be
                  available within 5 days.
                </li>
                <li>The information you provided us is incomplete or inaccurate.</li>
                <li>
                  Products ordered are for commercial resale and not for
                  self-consumption.
                </li>
                <li>
                  Multiple items ordered at the same address or using the same
                  mobile number or email address.
                </li>
                <li>Bulk quantity of items ordered.</li>
                <li>Any malpractice used to place the order.</li>
                <li>Any other criteria as deemed fit by Team Computers.</li>
              </ul>

              <p className="text-foreground/75 dark:text-white/70">
                If we decline, reject or limit your order after you have made
                payment, we will notify you and refund the amount paid. If there
                are any errors on the Webpage that affects your order or if
                there has been an error in the price of the Product you ordered,
                we reserve the right to correct the error and will endeavor to
                notify you of the same. In such a case, you may either choose to
                purchase the Product at the correct price or information, or
                cancel your order via portal / email and we refund you the
                amount paid.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                Prices and Offers
              </h3>
              <p className="text-foreground/75 dark:text-white/70">
                All prices are in Indian Rupees and unless specified otherwise,
                include all applicable taxes and standard delivery charges. All
                promotional prices are final prices and cannot be clubbed with
                other existing promotional offers. Offers, prices,
                specifications and availability may change or be withdrawn
                without notice.
              </p>

              <p className="text-foreground/75 dark:text-white/70">
                We take no responsibility for any editorial, photographic or
                typographic errors, and may correct any errors and change or
                update information on the Webpage without prior notice. Subject
                to a reduction in price in accordance with the succeeding
                paragraph below or unless a change in price is caused by our
                error, any change in Product price will not affect you once we
                have issued you with an Order Confirmation.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                Payment and Payment Methods
              </h3>
              <p className="text-foreground/75 dark:text-white/70">
                The total amount specified on the checkout page is the amount
                payable. We accept payment by valid Visa, AMEX, Diners and
                Master credit cards/debit cards, electronic wallets, UPI or
                other payment modes as enabled on the eStore. Your credit card
                will be charged at the point of purchase. We are not liable for
                any fees incurred by you as a result of your chosen payment
                method. In certain circumstances, we may require a
                re-authorization for your chosen method of payment. However,
                you will not be charged twice if this occurs.
              </p>

              <p className="text-foreground/75 dark:text-white/70">
                You, as a Buyer understand and agree that:
              </p>

              <ul className="list-disc space-y-2 pl-5 text-foreground/75 dark:text-white/70">
                <li>
                  The payment facility provided is neither a banking nor
                  financial service but is merely a facilitator providing an
                  electronic, automated online payment for the transactions on
                  the Webpage using the existing authorized banking
                  infrastructure and payment gateway networks.
                </li>
                <li>
                  Upon initiating a transaction, you are entering into a legally
                  binding and enforceable contract with Team Computers to
                  purchase the products and /or services by using the payment
                  facility.
                </li>
                <li>
                  You may agree with the seller through electronic communication
                  and electronic records and using the automated features as
                  may be provided on any extension/ increase in the dispatch
                  and/or delivery time and the transaction shall stand amended
                  to such extent.
                </li>
                <li>
                  You shall be entitled to claim a refund of the transaction
                  price (as your sole and exclusive remedy) in case you do not
                  receive the delivery within the time period agreed in the
                  transaction or within the time period as provided in the
                  policies, whichever is later. If you do not raise a refund
                  claim on Seller using Webpage features within the stipulated
                  time then this would make you ineligible for a refund.
                </li>
              </ul>

              <div className="space-y-2">
                <p className="text-foreground/75 dark:text-white/70">
                  Refund:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-foreground/75 dark:text-white/70">
                  <li>
                    For damaged/ defective items, the seller will issue a refund
                    if the item cannot be repaired or replaced. In any case,
                    where a refund is required, Team Computers needs to
                    authorise that refund.
                  </li>
                  <li>
                    Refunds once initiated and approved will be credited to the
                    customer’s account within 3 weeks of authorization.
                  </li>
                  <li>
                    Cash on Delivery provision is not available at present as a
                    payment method.
                  </li>
                  <li>
                    Refund shall be made in Indian Rupees only and shall be
                    equivalent to the transaction price paid by the customer in
                    Indian Rupees.
                  </li>
                  <li>
                    In case of any coupons, subvention, discount or cashbacks
                    provided to the customer, refund shall be net of the coupon
                    value, subvention, discount or cashback availed by the
                    customer in Indian Rupees.
                  </li>
                  <li>Refund shall be subject to you complying with refund policies.</li>
                  <li>
                    Team Computers reserves the right to impose limits on the
                    number of transactions or transaction price received from a
                    single valid credit/debit card / net banking / electronic
                    wallets / UPI or such other infrastructure or any other
                    financial instrument directly or indirectly through payment
                    aggregator or through any such facility authorized by the
                    Reserve Bank of India to provide enabling support facility
                    for collection and remittance of payment, and reserves the
                    right to refuse to process transactions exceeding such
                    limit.
                  </li>
                </ul>
              </div>

              <p className="text-foreground/75 dark:text-white/70">
                Team Computers reserves the right to refuse to process
                transactions by buyers with a prior history of questionable
                charges including without limitation breach of any agreements
                with Seller or breach/violation of any law or any charges
                imposed by issuing bank or breach of any policy.
              </p>

              <p className="text-foreground/75 dark:text-white/70">
                You acknowledge that Team Computers will not be liable for any
                damages, interests or claims etc. resulting from not processing
                a transaction/transaction price or any delay in processing a
                transaction/transaction price which is beyond our control.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                EMI
              </h3>
              <p className="text-foreground/75 dark:text-white/70">
                Bank’s EMI on the Webpage could be on the customer interest
                bearing model. EMI is at the sole discretion of the banks/
                issuers/ Non Banking Financial Companies (NBFCs) at an
                applicable rate of interest. All EMI related queries are
                between you and the banks/ issuers/ Non Banking Financial
                Companies (NBFCs). Sellers shall not take any responsibility
                under any circumstances with regard to any dispute between you
                and banks/ issuers/ Non Banking Financial Companies (NBFCs).
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                Shipment &amp; Delivery
              </h3>

              <h4 className="text-base font-semibold text-foreground dark:text-white">
                Order Fulfillment
              </h4>
              <p className="text-foreground/75 dark:text-white/70">
                Orders received shall be fulfilled by Team Computers or
                authorized local partner of Team Computers nearest to the
                delivery address mentioned in your order. The product invoice
                for the purchase will be issued by the party fulfilling the
                order.
              </p>
              <p className="text-foreground/75 dark:text-white/70">
                The orders will be shipped to the address entered in the
                shipping address field at the time of placing the order. Team
                Computers / sellers will not be responsible for any delay caused
                by the incorrect shipping address entered at the time of
                placing the order.
              </p>
              <p className="text-foreground/75 dark:text-white/70">
                You can place orders for any of the products listed on the
                Webpage. Acceptance of the order is subject to both payment and
                stock availability. Seller(s) however reserves its right to
                refuse to execute any transaction/s with any customer without
                assigning any reason(s) whatsoever.
              </p>

              <p className="text-foreground/75 dark:text-white/70">
                Delivery Time Frame: The products shall be delivered within a
                maximum time frame of 6 weeks from the date of placing the
                order. Team Computers will not be held responsible for any delay
                or failure to comply with our obligations under these
                conditions if the delay or failure arises from any cause which
                is beyond our reasonable control.
              </p>

              <p className="text-foreground/75 dark:text-white/70">
                Sellers or their authorized delivery partners reserve the right
                to restrict delivery to specific locations or delivery
                facilities. Specifically, sellers shall not deliver any goods
                to MailBox locations.
              </p>

              <h4 className="pt-2 text-base font-semibold text-foreground dark:text-white">
                Product Receipt and Acceptance Confirmation Process
              </h4>
              <p className="text-foreground/75 dark:text-white/70">
                Please ensure that you inspect the shipment as soon as you
                accept it from the courier / logistics service provider. In
                case of any physical damage to the outer or inner packaging,
                either refuse to accept delivery or accept delivery only after
                putting a suitable remark on the proof of delivery receipt
                document. Sellers retain the right to withhold
                refund/replacement of the damaged product if you fail to put a
                note about the nature of damage on the courier receipt
                confirmation slip.
              </p>
              <p className="text-foreground/75 dark:text-white/70">
                In case of any damage to the actual product, you are required
                to inform the customer care (Number / Email ID to be defined)
                within 24 hours of receipt of the product post which we shall
                not be liable in any manner for refund/replacement against the
                damage or any product related issues.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                Cancellation and Variation Before Delivery
              </h3>
              <p className="text-foreground/75 dark:text-white/70">
                Unless otherwise provided in these Terms and Conditions below,
                orders cannot be cancelled or amended after the order is
                confirmed.
              </p>
              <p className="text-foreground/75 dark:text-white/70">
                Team Computers reserves the right to accept or cancel orders for
                any reason. You agree not to dispute the decision made by the
                seller and accept the seller’s decision regarding the
                cancellation. Seller(s) also reserve the right to cancel your
                order in case of:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-foreground/75 dark:text-white/70">
                <li>Problems identified by the credit and fraud avoidance department.</li>
                <li>Inaccuracies or errors in product or pricing information.</li>
                <li>Limitations on quantities available for purchase.</li>
                <li>Products ordered for commercial resale and not for self-consumption.</li>
                <li>Bulk quantity of items ordered.</li>
                <li>Invalid address given in order details.</li>
                <li>Any malpractice used to place the order.</li>
                <li>Any other criteria as deemed fit by Team Computers.</li>
                <li>Any other reasons beyond reasonable control of Seller.</li>
              </ul>
              <p className="text-foreground/75 dark:text-white/70">
                The Seller may also require additional verifications or
                information before accepting any order. Sellers will contact
                you if all or any portion of your order is cancelled or if
                additional information is required to accept your order. If your
                order is cancelled after your payment has been debited, the
                said amount will be returned back at your issuing bank from
                where the transaction was made.
              </p>
            </div>
          </div>
      </section>
    </main>
  );
}
