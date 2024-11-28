package com.travelbe.controller.pub.residence.models;

import com.travelbe.model.enums.EResidence;
import lombok.Builder;

@Builder
public record AmenitiesCriteria(
        Boolean hotel,
        Boolean homestay,
        Boolean villa,
        Boolean home,
        Boolean bbq,
        Boolean cook,
        Boolean notDeposit,
        Boolean seeView,
        Boolean receptionist,
        Boolean washing,
        Boolean pet,
        Boolean smoking
) {
    public boolean hasResidenceType() {
        if(hotel && homestay && villa && home) return false;
        return hotel || homestay || villa || home;
    }

    public boolean hasFacilities() {
        if(bbq && cook && notDeposit && seeView && receptionist && washing && pet && smoking) return false;
        return bbq || cook || notDeposit || seeView || receptionist || washing || pet || smoking;
    }

    public EResidence hasHotel() {
        return hotel ? EResidence.HOTEL : EResidence.OTHER;
    }
    public EResidence hasHomestay() {
        return homestay ? EResidence.HOMESTAY : EResidence.OTHER;
    }
    public EResidence hasVilla() {
        return villa ? EResidence.VILLA : EResidence.OTHER;
    }
    public EResidence hasHome() {
        return home ? EResidence.HOME : EResidence.OTHER;
    }

    public String bbqString() {
        return "BBQ";
    }
    public String cookString() {
        return "COOK";
    }
    public String notDepositString() {
        return "NOTDEPOSIT";
    }
    public String seeViewString() {
        return "SEEVIEW";
    }
    public String receptionistString() {
        return "RECEPTIONIST";
    }
    public String washingString() {
        return "WASHING";
    }
    public String petString() {
        return "PET";
    }
    public String smokingString() {
        return "SMOKING";
    }

}
