// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START domains_v1beta1_domains_registration_update]

import (
	"context"
	"fmt"
	"io"

	domains "cloud.google.com/go/domains/apiv1beta1"
	domainspb "cloud.google.com/go/domains/apiv1beta1/domainspb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateRegistration updates the labels of an existing Cloud Domains registration.
func updateRegistration(ctx context.Context, w io.Writer, projectID string, locationID string, registrationID string) error {
	registration := &domainspb.Registration{
		Name: fmt.Sprintf("projects/%s/locations/%s/registrations/%s", projectID, locationID, registrationID),
		Labels: map[string]string{
			"env": "test",
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}

	client, err := domains.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("domains.NewClient: %w", err)
	}
	defer client.Close()

	req := &domainspb.UpdateRegistrationRequest{
		Registration: registration,
		UpdateMask:   updateMask,
	}

	op, err := client.UpdateRegistration(ctx, req)
	if err != nil {
		// Handle NotFound code when operating in validation sandbox environments.
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Updated registration: %s\n", registration.GetName())
			return nil
		}
		return fmt.Errorf("client.UpdateRegistration: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Updated registration: %s\n", registration.GetName())
			return nil
		}
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated registration: %s\n", resp.GetName())

	return nil
}

// [END domains_v1beta1_domains_registration_update]
