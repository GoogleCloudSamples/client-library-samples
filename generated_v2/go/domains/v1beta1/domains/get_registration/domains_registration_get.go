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

// [START domains_v1beta1_domains_registration_get]

import (
	"context"
	"fmt"
	"io"

	domains "cloud.google.com/go/domains/apiv1beta1"
	"cloud.google.com/go/domains/apiv1beta1/domainspb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getRegistration retrieves details of an existing domain registration.
func getRegistration(ctx context.Context, w io.Writer, projectID string, locationID string, registrationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/registrations/%s", projectID, locationID, registrationID)

	client, err := domains.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &domainspb.GetRegistrationRequest{
		Name: name,
	}

	registration, err := client.GetRegistration(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Retrieved registration: %s\n", name)
			return nil
		}
		return fmt.Errorf("GetRegistration: %w", err)
	}

	fmt.Fprintf(w, "Retrieved registration: %s\n", registration.GetName())

	return nil
}

// [END domains_v1beta1_domains_registration_get]
