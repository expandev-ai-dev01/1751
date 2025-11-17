import { ContactForm } from '@/domain/contact/components/ContactForm';
import type { VehicleContactSectionProps } from './types';

/**
 * @component VehicleContactSection
 * @summary Contact form section for vehicle detail page
 * @domain vehicle
 * @type page-component
 * @category form
 */
export const VehicleContactSection = (props: VehicleContactSectionProps) => {
  const { vehicleId, vehicleModel } = props;

  return (
    <div id="contact-form" className="scroll-mt-8">
      <ContactForm vehicleId={vehicleId} vehicleModel={vehicleModel} />
    </div>
  );
};
