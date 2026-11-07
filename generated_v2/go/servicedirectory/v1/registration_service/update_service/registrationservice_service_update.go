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

// [START servicedirectory_v1_registrationservice_service_update]

import (
	"context"
	"fmt"
	"io"

	servicedirectory "cloud.google.com/go/servicedirectory/apiv1"
	sdpb "cloud.google.com/go/servicedirectory/apiv1/servicedirectorypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateService updates the annotations of an existing Service Directory service.
func updateService(ctx context.Context, w io.Writer, projectID string, locationID string, namespaceID string, serviceID string) error {
	client, err := servicedirectory.NewRegistrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRegistrationClient failed: %w", err)
	}
	defer client.Close()

	service := &sdpb.Service{
		Name: fmt.Sprintf("projects/%s/locations/%s/namespaces/%s/services/%s", projectID, locationID, namespaceID, serviceID),
		Annotations: map[string]string{
			"updated_key": "updated_value",
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"annotations"},
	}

	req := &sdpb.UpdateServiceRequest{
		Service:    service,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateService(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateService: %w", err)
	}

	fmt.Fprintf(w, "Updated service: %s\n", resp.GetName())
	return nil
}

// [END servicedirectory_v1_registrationservice_service_update]
